import { formatDate } from '../utils/helper';
import { useStateContext } from '../contexts/ContextProvider';



const ProfileImage = () => {

  const { user } = useStateContext();

  return (
    <div className="h-full tab:h-screen w-full md:w-[35%] lg:w-[33%] p-1 shadow-custom rounded-none xs:rounded-md">
      <div className="items-center justify-center flex md:justify-normal md:items-start">
        <div className="items-center justify-center">
          <img src="http://laravel-react-fullstack.test/tatang.jpg" className="rounded-xl w-[220px] h-[220px]" alt="image-profile" />
          <div className="flex items-center justify-center mt-3">
            Bergabung: {formatDate(user?.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
