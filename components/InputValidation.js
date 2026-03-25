export const validateNewBirdName = (countables, newBirdName) => {
  const cleanBirdName = newBirdName.trim().toLowerCase();

  if (!cleanBirdName) {
    return "Bird name cannot be empty";
  }

  const duplicateBirdName = countables.some(
    (bird) => bird.name.trim().toLowerCase() === cleanBirdName,
  );

  if (duplicateBirdName) {
    return `Bird ${cleanBirdName} already exists`;
  }

  return null;
};
