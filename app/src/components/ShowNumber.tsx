import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

const ShowNumber = props => {
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const globalUser = useUserStore(state => state.user);

  return (
    <div
      style={
        preview
          ? { backgroundColor: themeBgColor }
          : { backgroundColor: globalUser.bgcolor }
      }
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <h1 className="text-8xl font-extrabold tracking-widest">
        {props.numberShown}
      </h1>
    </div>
  );
};

export default ShowNumber;
