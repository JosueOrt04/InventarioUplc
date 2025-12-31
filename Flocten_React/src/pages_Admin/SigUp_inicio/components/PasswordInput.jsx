import { Lock, Eye, EyeOff } from 'lucide-react';
import { FormInput } from './FormInput';

export const PasswordInput = ({ value, onChange, showPassword, onToggle, placeholder = '••••••••' }) => {
  return (
    <FormInput
      label="Password"
      type={showPassword ? 'text' : 'password'}
      icon={Lock}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name="password"
      rightIcon={
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="size-5 text-base-content/40" />
          ) : (
            <Eye className="size-5 text-base-content/40" />
          )}
        </button>
      }
    />
  );
};