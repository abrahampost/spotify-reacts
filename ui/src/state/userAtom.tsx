import { atom, DefaultValue } from 'recoil';
import IUser from '../domain/IUser';

const localStorageEffect = <T extends object>(key: string) => ({setSelf, onSet }: { setSelf: Function, onSet: Function}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue: T) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const userAtom = atom<IUser | null>({
    key: 'userAtom',
    default: null,
    effects_UNSTABLE: [
        localStorageEffect('user')
    ]
});