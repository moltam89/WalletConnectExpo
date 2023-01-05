import ModalSkeleton from "./ModalSkeleton";
import Settings from "./Settings";

export default function SettingsModal({ frameConstants, onCloseFunction }) {
    const content = (<> 
        <Settings
            frameConstants={frameConstants}
            onCloseFunction={onCloseFunction}
        />
    </>);
 
  return (
      <>
        <ModalSkeleton
            content={content}
            frameConstants={frameConstants}
            onCloseFunction={onCloseFunction}
        />
      </>
    );
}

