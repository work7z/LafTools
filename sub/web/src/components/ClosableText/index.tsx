import { Dot } from "../../utils/TranslationUtils";

// define a component that provide isClose, onClose, and text
export const ClosableText = (props: {
  isClose: boolean | undefined;
  onClose: () => void;
  text: string | JSX.Element;
}) => {
  if (props.isClose) {
    return <></>;
  }
  return (
    <div className="flex flex-column">
      <div className="flex-grow">
        {props.text}
        {!props.isClose ? (
          <span
            onClick={() => {
              props.onClose();
            }}
            className=" hover:underline cursor-pointer"
          >
            [{Dot("4vdfwf", "OK")}]
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
