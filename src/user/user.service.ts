import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
    private users: User[] = [
        { 
            id: 1, 
            name: 'Alice', 
            email: 'alice@example.com' 
        },
        { 
            id: 2, 
            name: 'Alice 12', 
            email: 'alice12@example.com' 
        }
    ];

    // GET - Retrieve all users
    getAllUsers(): User[] {
        return this.users;
    }

    // GET - Retrieve user by ID
    getUser(id: number): User | { message: string } {
        return this.users.find((user) => user.id === id) || { message: 'User not found' };
    }

    // POST - Create a new user
    createUser(user: { name: string; email: string }): User {
        const newUser: User = { id: this.users.length + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }
}
