import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

const ShowInCorrect = prop => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };

  return (
    <div
      style={style}
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <h1 className="justify-center px-8 text-7xl font-extrabold">
        Wrong... The number was {prop.numberShown}.
      </h1>
    </div>
  );
};

export default ShowInCorrect;
