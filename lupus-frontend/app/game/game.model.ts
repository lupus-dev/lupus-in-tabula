import { User } from '../user/user.model';

export class Game {
	game_id: string;
	owner_id: string;
	owner: User;
	name: string;
	members: string[] | User[];
	state: any;
	gen_info: any;

	static stateColor(game: Game): string {
		let code = game.state.status.code;
		switch (code) {
			case 'draft':   return 'default';
			case 'open':    return 'primary';
			case 'closed':  return 'warning';
			case 'full':    return 'warning';
			case 'running': return 'success';
			case 'ended':   return 'info';
			case 'stopped': return 'danger';
		}
		return 'danger';
	}
}