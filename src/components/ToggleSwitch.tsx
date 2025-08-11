import "../styles/ToggleSwitch.css";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

/**
 * A simple toggle switch component.
 * @param {boolean} isOn - The current state of the switch.
 * @param {function} onToggle - The function to call when the switch is toggled.
 */
const ToggleSwitch = ({ isOn, onToggle }: ToggleSwitchProps) => {
  return (
    <label className="toggle-switch-label">
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => onToggle(e.target.checked)}
        className="toggle-switch-input"
      />
      <span className={`toggle-switch-background ${isOn ? "on" : ""}`}>
        <span className="toggle-switch-knob" />
      </span>
    </label>
  );
};

export default ToggleSwitch;
