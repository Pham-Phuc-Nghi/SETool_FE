import UserAvatar from "./UserAvatar";

const HeaderMenu = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent:"space-between" }}>
        <UserAvatar></UserAvatar>
      </div>
    </div>
  );
};

export default HeaderMenu;
