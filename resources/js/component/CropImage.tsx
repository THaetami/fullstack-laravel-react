import React from 'react';
import { ChangeEvent, createRef, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import Cropper, { ReactCropperElement } from "react-cropper";
import axiosInstance from '../utils/api-default';
import { dataURLtoBlob, getUser } from '../utils/helper';
import { FormErrors } from '../utils/dataInterface';

import "cropperjs/dist/cropper.css";
import '../../sass/component/crop-image.scss';

const CropImage = () => {

  const { user, setUser, setNotification, setOpenModal } = useStateContext();
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const [change, setChange] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>(user?.image);
  const [cropData, setCropData] = useState<string>("");
  const cropperRef = createRef<ReactCropperElement>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.preventDefault();
    setCropData("");
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

   const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (cropData) {
      const blob = dataURLtoBlob(cropData);
      formData.append('profile', blob, 'profile.png');
    }

    axiosInstance.post('/user/upload', formData, {
       headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(async () => {
      setNotification("foto profile berhasil diupload", "success");
      const userData = await getUser();
      setUser(userData);
      setOpenModal({ toggle: false, setting: "" });

    })
    .catch(err => {
      const response = err.response
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    })
  };

  return (
    <>
      <div className="w-full inline-block xs:flex mt-4">
        {!change &&
          <div className="flex items-center justify-center w-full xs:w-[65%]">
            <img src={user?.image ? `http://laravel-react-fullstack.test/storage/upload/${user.image}` : "http://laravel-react-fullstack.test/default-image.png"} className="rounded-full w-[220px] h-[220px]" alt="image-profile" />
          </div>
        }

         {change &&
            <Cropper
              ref={cropperRef}
              // style={{ height: 400 }}
              className="w-full xs:w-[65%] h-[300px]"
              // zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={220}
              minCropBoxWidth={220}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
        }
        <div className="relative m-3 xs:m-0 xs:ml-3 mt-6 xs:mt-0 items-center justify-center">
          <div className="m-0 w-full" onClick={() => setChange(true)} >
            <input type="file" onChange={onChange} className="file-input text-sm file-input-bordered w-full max-w-xs cursor-pointer" />
          </div>

           {
              errors &&
              <div className="bg-red-400 text-white mb-[3px] block text-sm p-1 mt-3 rounded-md">
                  {Object.keys(errors).map((key, index) => (
                    <p key={index}>{errors[key][0]}</p>
                  ))}
              </div>
            }

          {cropData === "" ? (
            <button onClick={getCropData} className="btn w-full m-0">Crop</button>
          ) : (
            <button onClick={onSubmit} className="btn w-full m-0">Upload</button>
          )}
        </div>
        {/* <div className="box pt-4 md:w-1/2 flex justify-start items-center" >
          <div className="img-preview w-[60%] h-[200px]"/>
        </div> */}
      </div>
      <br style={{ clear: "both" }} />
    </>
  )
}

export default CropImage;
