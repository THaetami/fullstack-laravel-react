import React from "react";
import { Helmet } from "react-helmet-async";
import { useStateContext } from "../contexts/ContextProvider";
import Footer from "../component/Footer";
import HeaderPage from "../component/HeaderPage";
import { useState } from "react";
import ProfileImage from "../component/ProfileImage";
import ProfileForm from "../component/ProfileForm";
import { FormErrors } from "../utils/dataInterface";

// import '../styles/views/layout-page.scss';
// import '../../sass/view/layout-page.scss';

export default function Profile() {

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const { user } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleEditToggle = () => {
    setOpenEdit(!openEdit);
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      passwordConfirmation: ''
    })
    setErrors(null)
  };

  return (
    <>
      <Helmet>
        <title>{user?.name}</title>
        <meta name='description' content='profile page' />
      </Helmet>
      <div className="wrap-page h-screen overflow-auto items-center">
        <div className="kontener-page mt-3 mx-auto mb-10">
          <div className=" mx-auto">
            <HeaderPage title="Profile Setting">
              <div className="flex justify-end xs:justify-normal space-x-1">
                <button onClick={handleEditToggle} className="py-2 hidden md:block px-3 border-2 rounded-md border-slate-300 text-center hover:bg-white hover:border-white">{!openEdit ? 'Edit': 'Cancel'}</button>
              </div>
            </HeaderPage>

            <div className=" my-2">
              <div className="grid md:grid-cols-2 md:flex w-full md:justify-center">

                <ProfileImage />

                <ProfileForm
                  openEdit={openEdit}
                  handleEditToggle={handleEditToggle}
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  setErrors={setErrors}
                />

                <div className="hidden h-screen lg:w-[20%] lg:flex top-0 md:flex-col gap-4">
                  <div className="mt-2">
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
