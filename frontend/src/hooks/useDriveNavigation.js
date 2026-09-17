import { useState } from 'react';

export function useDriveNavigation(initialPath = null) {
  const [folderPath, setFolderPath] = useState(initialPath || [
    { id: import.meta.env.VITE_DRIVE_FOLDER_ID, name: 'Root' }
  ]);

  const navigateToFolder = (id, name) => {
    const newPath = [...folderPath, { id, name }];
    setFolderPath(newPath);
    return newPath;
  };

  const goUp = () => {
    if (folderPath.length > 1) {
      const newPath = folderPath.slice(0, -1);
      setFolderPath(newPath);
      return newPath;
    }
    return folderPath;
  };

  const goToRoot = () => {
    const rootPath = [{ id: import.meta.env.VITE_DRIVE_FOLDER_ID, name: 'Root' }];
    setFolderPath(rootPath);
    return rootPath;
  };

  const getCurrentFolder = () => folderPath[folderPath.length - 1];
  const getParentFolder = () => folderPath.length > 1 ? folderPath[folderPath.length - 2] : null;

  return {
    folderPath,
    navigateToFolder,
    goUp,
    goToRoot,
    getCurrentFolder,
    getParentFolder,
  };
}