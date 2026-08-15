const unsafeSnapshotCharacters = /[^a-zA-Z0-9._-]+/g;

export const toSafeSnapshotName = (snapshotName: string): string => {
  const normalizedName = snapshotName.trim().replace(unsafeSnapshotCharacters, '-');
  const safeName = normalizedName.replace(/^-+|-+$/g, '').toLowerCase();

  if (safeName.length === 0) {
    throw new Error('Snapshot name must contain at least one safe character.');
  }

  return `${safeName}.png`;
};
