import { User } from '../user/user.model';

export class Game {
	game_id: string;
	owner_id: string;
	owner: User;
	name: string;
	members: string[] | User[];
	state: any;
	gen_info: any;
}