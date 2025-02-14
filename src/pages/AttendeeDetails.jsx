// AttendeeDetails.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AttendeeDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // For preview
  const [imageUrl, setImageUrl] = useState(''); // For Cloudinary URL
  const [errors, setErrors] = useState({});
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTicket, ticketCount } = location.state || {};

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('attendeeDetails');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name || '');
      setEmail(parsedData.email || '');
      setSpecialRequest(parsedData.specialRequest || '');
      setImageUrl(parsedData.imageUrl || '');
      if (parsedData.imageUrl) {
        setProfilePhoto(parsedData.imageUrl); // Preview from localStorage if URL exists
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'attendeeDetails',
      JSON.stringify({
        name,
        email,
        specialRequest,
        imageUrl,
      })
    );
  }, [name, email, specialRequest, imageUrl]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file)); // Immediate preview
      setErrors({ ...errors, imageUrl: null }); // Clear any previous error
      // Reset success status for new upload
      setUploadSuccess(false);
      await uploadToCloudinary(file); // Await the upload
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file)); // Immediate preview
      setErrors({ ...errors, imageUrl: null });
      setUploadSuccess(false);
      await uploadToCloudinary(file); // Await the upload
    }
  };

  const handlePaste = (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    if (paste.startsWith('http://') || paste.startsWith('https://')) {
      setImageUrl(paste);
      setProfilePhoto(paste); // For preview
      setErrors({ ...errors, imageUrl: null });
    } else {
      setErrors({
        ...errors,
        imageUrl: 'Invalid URL. Please paste a valid image URL.',
      });
    }
  };

  const uploadToCloudinary = async (file) => {
    const preset_key = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;

    // Debug logging
    console.log('Uploading file:', file);
    console.log('VITE_UPLOAD_PRESET:', preset_key);
    console.log('VITE_CLOUD_NAME:', cloud_name);

    if (!preset_key || !cloud_name) {
      console.error('Missing Cloudinary configuration. Check your .env file.');
      setErrors({ ...errors, imageUrl: 'Cloudinary configuration error.' });
      return;
    }

    // Start loading
    setUploadLoading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    formData.append('public_id', `user_uploads/${uuidv4()}`);
    formData.append('cloud_name', cloud_name);

    // Construct the Cloudinary endpoint
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    console.log('Cloudinary upload URL:', uploadUrl);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Cloudinary upload failed: ${response.statusText} - ${errorData.error?.message || 'Unknown error'
          }`
        );
      }
      const data = await response.json();
      setImageUrl(data.secure_url); // Set the Cloudinary URL
      console.log('Cloudinary URL:', data.secure_url);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      setErrors({ ...errors, imageUrl: 'Failed to upload image. Please try again.' });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Check for image presence (after upload, imageUrl will be set)
    if (!imageUrl && !profilePhoto) {
      newErrors.imageUrl = 'Image is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    localStorage.removeItem('attendeeDetails');

    navigate('/ticket-confirmation', {
      state: {
        name,
        email,
        specialRequest,
        profilePhoto: imageUrl, // Send imageUrl
        selectedTicket,
        ticketCount,
      },
    });
  };

  return (
    <div className="max-w-[700px] min-h-[858px] p-4 sm:p-8 lg:p-12 bg-custom-dark2 rounded-2xl sm:rounded-[40px] border border-custom-dark7 flex flex-col justify-center items-center gap-6 sm:gap-8 mx-auto mt-4 sm:mt-10">
      {/* Title and Step Indicator */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl sm:text-[32px] font-secondary-custom">
            Attendee Details
          </div>
          <div className="text-neutral-50 text-sm sm:text-base font-normal">Step 2/3</div>
        </div>
        <div className="relative h-1 bg-custom-dark7 rounded-full">
          <div className="absolute left-0 top-0 h-1 bg-custom-blue2 rounded-full w-2/3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-4 sm:p-6 bg-custom-dark5 rounded-2xl sm:rounded-[32px] border border-custom-dark8 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-8 px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 bg-custom-dark4 rounded-2xl sm:rounded-3xl border border-custom-dark9">
          <div className="text-center text-neutral-50 text-sm sm:text-base font-normal">
            Upload Profile Photo
          </div>
          <div
            className="self-stretch h-[200px] bg-black/20 flex justify-center items-center"
            onPaste={handlePaste}
          >
            {/* Clickable label wrapping the SVG and content */}
            <label
              htmlFor="photo-upload"
              className="w-60 h-60 p-6 bg-custom-dark7 rounded-[32px] border-4 border-custom-blue1/50 flex flex-col justify-center items-center gap-4 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Uploaded Profile"
                  className="w-full h-full object-cover rounded-[32px]"
                />
              ) : (
                <>
                  <div className="relative">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.2639 14.816C24.6812 10.2267 20.7505 6.66669 16.0052 6.66669C12.3305 6.66669 9.13854 8.81469 7.68121 12.2C4.81721 13.056 2.67188 15.76 2.67188 18.6667C2.67188 22.3427 5.66254 25.3334 9.33854 25.3334H10.6719V22.6667H9.33854C7.13321 22.6667 5.33854 20.872 5.33854 18.6667C5.33854 16.7947 6.93721 14.9907 8.90254 14.6454L9.67721 14.5094L9.93321 13.7654C10.8705 11.0307 13.1972 9.33335 16.0052 9.33335C19.6812 9.33335 22.6719 12.324 22.6719 16V17.3334H24.0052C25.4759 17.3334 26.6719 18.5294 26.6719 20C26.6719 21.4707 25.4759 22.6667 24.0052 22.6667H21.3385V25.3334H24.0052C26.9465 25.3334 29.3385 22.9414 29.3385 20C29.337 18.8047 28.9347 17.6444 28.196 16.7047C27.4574 15.7649 26.425 15.0999 25.2639 14.816Z"
                        fill="#FAFAFA"
                      />
                      <path
                        d="M17.3385 18.6667V13.3334H14.6719V18.6667H10.6719L16.0052 25.3334L21.3385 18.6667H17.3385Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <div className="self-stretch text-center text-neutral-50 text-sm sm:text-base font-normal leading-normal">
                    Drag & drop or click to upload
                    <br />
                    Or paste an image URL
                  </div>
                </>
              )}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload"
              accept="image/*"
            />
          </div>
          {errors.imageUrl && <div className="text-red-500 text-sm">{errors.imageUrl}</div>}
          {uploadLoading && <div className="text-blue-500 text-sm">Uploading image...</div>}
          {uploadSuccess && !uploadLoading && (
            <div className="text-green-500 text-sm">Image uploaded successfully!</div>
          )}
        </div>

        <div className="h-px bg-custom-dark9 w-full"></div>

        {/* Enter Your Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-neutral-50 text-sm sm:text-base font-normal leading-normal"
          >
            Enter your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 text-white"
            id="name"
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        {/* Enter Your Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-neutral-50 text-sm sm:text-base font-normal leading-normal"
          >
            Enter your email *
          </label>
          <div className="w-full p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z"
                fill="white"
              />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow text-white bg-transparent outline-none"
              placeholder="hello@avioflagos.io"
              id="email"
            />
          </div>
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        {/* Special Request */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="specialRequest"
            className="text-neutral-50 text-sm sm:text-base font-normal leading-normal"
          >
            Special request?
          </label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="w-full h-32 p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 text-custom-gray1"
            placeholder="Textarea"
            id="specialRequest"
          ></textarea>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex gap-4 sm:gap-6">
        <Link to="/" className="flex-1">
          <button className="w-full h-12 py-3 rounded-lg border border-custom-blue2 text-custom-blue2 font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500">
            Back
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          disabled={uploadLoading} // Disable button while upload is in progress
          className={`flex-1 h-12 py-3 rounded-lg text-white font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500 ${uploadLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-custom-blue2'
            }`}
        >
          {uploadLoading ? 'Uploading...' : 'Get My Ticket'}
        </button>

      </div>
    </div>
  );
};

export default AttendeeDetails;
