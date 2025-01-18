import { ProfileInfoProps } from "./ProfileInfo.model";
import './ProfileInfo.css';

export const ProfileInfo = (props: ProfileInfoProps) => {
  return (
    <>
      <div className="profile-info">
        <p className="label"><strong>{props.label}</strong></p>
        &nbsp;
        <p>{props.content}</p>
      </div>
    </>
  )
}