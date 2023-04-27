import { faker } from '@faker-js/faker';

const fakeUser = () => {
  return {
    id: faker.datatype.uuid(),
    fullName: faker.name.fullName(),
    avatar: faker.image.avatar(),

  }
}

export const fakeUsers = (length) => {
    const users = []

    Array.from({length: length}).forEach(() => {
        users.push(fakeUser())
    })

    return users

}


export default fakeUser