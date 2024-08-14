function SubSettings({ type }) {
  return (
    <form className="settings__basic">
      <h2 className="tertiary-heading settings__heading">
        {type === "basic" ? "Basic" : "Security"} info
      </h2>
      <label className="settings__label">
        {type === "basic" ? "Username" : "Current password"} :
        <input
          className="settings__input "
          type="text"
          defaultValue={user.username}
          name="username"
        />
      </label>
      <label className="settings__label">
        Email:
        <input
          className="settings__input "
          type="email"
          defaultValue={user.email}
          name="email"
        />
      </label>
      <Button className="btn" size="small" type="submit">
        Save
      </Button>
    </form>
  );
}

export default SubSettings;
