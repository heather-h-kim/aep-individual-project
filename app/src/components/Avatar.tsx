import { useUserStore } from '../store/userStore';

const Avatar = () => {
  const globalUser = useUserStore(state => state.user);
  const firstNameString = new String(globalUser.firstName);
  const avFirstCharacter = firstNameString.charAt(0);
  const lastNameString = new String(globalUser.lastName);
  const avLastCharacter = lastNameString.charAt(0);
  const avatar = avFirstCharacter.concat(avLastCharacter);
  // console.log(avatar);
  return (
    <>
      <div
        style={{
          color: globalUser.fgcolor,
          backgroundColor: globalUser.bgcolor,
        }}
        className="h-16 w-16 border-none p-2 text-3xl font-extrabold"
      >
        {avatar}
      </div>
    </>
  );
};

export default Avatar;
