import clientSideRepo from './client-side-repository';

export default async function saveToClient(path, data) {
  const nextId = clientSideRepo.getNextId(path);
  const retVal = await clientSideRepo.addToCollection(`${path}:${nextId}`, data);

  return retVal
};
