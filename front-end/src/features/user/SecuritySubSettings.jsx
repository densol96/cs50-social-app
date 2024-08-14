import Button from "../../ui/Button";

function SecuritySubSettings() {
  return (
    <form className="settings__basic">
      <h2 className="tertiary-heading settings__heading">Security info</h2>
      <label className="settings__label">
        Password:
        <input
          className="settings__input "
          type="password"
          defaultValue="**********"
        />
      </label>
      <label className="settings__label">
        Password confirmation:
        <input
          className="settings__input "
          type="password"
          value="**********"
        />
      </label>
      <Button className="btn" size="small" type="submit">
        Save
      </Button>
    </form>
  );
}

export default SecuritySubSettings;
