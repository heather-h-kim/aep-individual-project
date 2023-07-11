import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useIsCorrectStore } from '../store/stateStore';

const ShowCorrect = prop => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);
  const { isCorrect, updateIsCorrect } = useIsCorrectStore(state => ({
    isCorrect: state.isCorrect,
    updateIsCorrect: state.updateIsCorrect,
  }));

  console.log('number of correct answers is', isCorrect);

  return (
    <div
      style={
        preview
          ? { backgroundColor: themeBgColor }
          : { backgroundColor: globalUser.bgcolor }
      }
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <h1 className="text-8xl font-extrabold tracking-widest">Correct!</h1>
    </div>
  );
};

export default ShowCorrect;
