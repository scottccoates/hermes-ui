import clientSideRepo from './client-side-repository';

export default{
  async saveToClient(path, data) {
    const retVal = await clientSideRepo.save(path, data);

    return retVal
  }
};
