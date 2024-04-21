import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosInstance from "../utils/api-default";
import { getUser } from "../utils/helper";
import { FormErrors } from "../views/Login";
import { FormInputRegis } from "../utils/dataInterface";
import FormInput from "./FormInput";
import { IoIosMail } from "react-icons/io";
import { BiSolidKey, BiSolidUser } from "react-icons/bi";


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
          <BiSolidUser />
        </FormInput>

        <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} disabled={!openEdit} >
          <IoIosMail className="w-4 h-4"/>
        </FormInput>

        <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} disabled={!openEdit} >
          <BiSolidKey />
        </FormInput>

        <FormInput label="Password Confirmation" type="password" name="passwordConfirmation" value={form.passwordConfirmation} onChange={handleChange} disabled={!openEdit} >
          <BiSolidKey />
        </FormInput>

        {
          openEdit && (
            <div className="flex gap-1">
              <div onClick={handleEditToggle} className="btn text-md w-1/2 bg-white">Cancel</div>
              <button className="btn text-md w-1/2 bg-white">Update</button>
            </div>
          )
        }
      </form>
    </div>
  );
}



export default ProfileForm;
