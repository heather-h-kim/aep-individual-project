import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

const ShowCorrect = () => {
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
      <h1 className="text-8xl font-extrabold tracking-widest">Correct!</h1>
    </div>
  );
};

export default ShowCorrect;
