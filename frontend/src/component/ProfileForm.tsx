import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosInstance from "../utils/api-default";
import { getUser } from "../utils/helper";
import { FormErrors } from "../views/Login";
import { FormInputRegis } from "../utils/dataInterface";
import FormInput from "./FormInput";


interface ProfileFormProps {
  openEdit: boolean;
  handleEditToggle: () => void;
  form: FormInputRegis;
  setForm: React.Dispatch<React.SetStateAction<FormInputRegis>>;
  errors: FormErrors | null;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors | null>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ openEdit, handleEditToggle, form, setForm, errors, setErrors }) => {
  const { user, setNotification, setUser } = useStateContext();

  useEffect(() => {
      setForm({
        ...form,
        name: user?.name || '',
        email: user?.email || ''
      });
  }, [user]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      password_confirmation: form.passwordConfirmation
    };

    axiosInstance.put('/user', payload)
      .then(async ({ data }) => {
        setNotification(`user ${data.data.updatedUser.name} berhasil diupdate`, 'success');
        const userData = await getUser();
        setUser(userData);
        handleEditToggle();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className=" h-screen overflow-auto w-full md:w-[65%] tab:w-[65%] lg:w-[62%] p-1">
      <div className="flex justify-end mt-2 md:hidden ">
        <button onClick={handleEditToggle} className="py-2 px-3 border-2 rounded-md border-slate-300 text-center hover:bg-white hover:border-white">{!openEdit ? 'Edit': 'Cancel'}</button>
      </div>
      <form onSubmit={onSubmit} className="mt-2 md:mt-0">
        {
          errors &&
          <div>
              {Object.keys(errors).map((key, index) => (
                <p className="input input-bordered mb-2 flex items-center text-red-300 gap-2" key={index}>{errors[key][0]}</p>
              ))}
          </div>
        }

        <FormInput label="Name" type="text" name="name" value={form.name} onChange={handleChange} disabled={!openEdit} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        </FormInput>

        <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} disabled={!openEdit} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        </FormInput>

        <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} disabled={!openEdit} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        </FormInput>

        <FormInput label="Password Confirmation" type="password" name="passwordConfirmation" value={form.passwordConfirmation} onChange={handleChange} disabled={!openEdit} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        </FormInput>

        {
          openEdit && (
            <div className="flex gap-1">
              <div onClick={handleEditToggle} className="btn text-lg w-1/2 bg-white">Cancel</div>
              <button className="btn text-lg w-1/2 bg-white">Update</button>
            </div>
          )
        }
      </form>
    </div>
  );
}



export default ProfileForm;
