import { Component, OnInit } from '@angular/core';
import { User } from './Model/User';
import { UserService } from './Service/user.service';
import { Story } from './Model/Story';
import { StoryService } from './Service/story.service';
import { Department } from './Model/Department';
import { DepartmentService } from './Service/department.service';
import { Option } from './Model/Option';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { VoteService } from './Service/vote.service';
import { Vote } from './Model/Vote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] | undefined;
  options: Option[] | undefined;
  selectedUser: User | undefined;
  selectedDepartment: Department | undefined;
  selectedOption: Option | undefined;
  departments: Department[] | undefined;
  selectedStory: Story | undefined;
  newStory: Story | undefined;
  visible: boolean = false;

  votes: Vote[] | undefined;

  public stories: Story[] = [];
  public error: string | null = null;

  constructor(private voteService: VoteService, private formBuilder: FormBuilder, private httpClient: HttpClient, private userService: UserService, private storyService: StoryService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
    this.userService.get().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );

    this.options = [
      { name: 'Likes', sortBy: 'likes' },
      { name: 'Dislikes', sortBy: 'dislikes' }
    ];

    this.storyService.get().subscribe(
      (stories: Story[]) => {
        this.stories = stories;
      },
      (error) => {
        console.error('Erro ao buscar estórias', error);
      }
    );
  }

  putStory(selectedStory: Story) {
    console.log(selectedStory);
    this.storyService.put(selectedStory).subscribe({
      next: (story: Story) => {
        console.log('História atualizada com sucesso:', story);
        this.storyService.get().subscribe(
          (stories: Story[]) => {
            this.stories = stories;
            this.visible = false;
          },
          (error) => {
            console.error('Erro ao buscar histórias:', error);
          }
        );
      },
      error: (error) => {
        console.error('Erro ao atualizar história:', error);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  sortStories() {
    if (!this.selectedOption) {
      console.error('Nenhuma opção selecionada.');
      return;
    }

    const sortBy = this.selectedOption.sortBy;
    this.stories = this.stories.sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else {
        return b.dislikes - a.dislikes;
      }
    });
  }

  getDepartmentName(departmentId: string): string {
    const department = this.departments?.find(d => d.id === departmentId);
    return department ? department.name : 'Departamento não encontrado';
  }

  getDepartments() {
    this.departmentService.get().subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      },
      (error) => {
        console.error('Erro ao buscar departamentos:', error);
      }
    );
  }

  deleteStory(storyId: string) {
    this.storyService.delete(storyId).subscribe({
      next: (success) => {
        if (success) {
          console.log('História deletada com sucesso.');
          this.storyService.get().subscribe(
            (stories: Story[]) => {
              this.stories = stories;
            },
            (error) => {
              console.error('Erro ao buscar histórias:', error);
            }
          );
        } else {
          console.error('Erro ao deletar história.');
        }
      },
      error: (error) => {
        console.error('Erro ao deletar história:', error);
      }
    });
  }


  vote(storyId: string, isLiked: boolean) {
    if (!this.selectedUser) {
      console.error('Nenhum usuário selecionado.');
      return;
    }

    const userId = this.selectedUser?.id;
    const story = this.stories.find(s => s.id === storyId);

    if (!story) {
      console.error('História não encontrada.');
      return;
    }

    const vote = {
      id: userId,
      userId: userId,
      isLiked: isLiked,
      Name: this.selectedUser.name,
      StoryId: storyId,
      story: story
    };

    this.voteService.addVote(vote).subscribe({
      next: (success) => {
        if (success) {
          console.log('Voto registrado com sucesso.');
          console.log('ID do Usuário: ', userId);

          this.storyService.get().subscribe(
            (stories: Story[]) => {
              this.stories = stories;
            },
            (error) => {
              console.error('Erro ao buscar estórias', error);
            }
          );

          this.voteService.getVotesByStoryId(storyId).subscribe(
            (votes: Vote[]) => {
              console.log('Votos para a história:', votes);
              story.Votes = votes;
            },
            (error) => {
              console.error('Erro ao buscar votos:', error);
            }
          );
        } else {
          console.error('Este usuário já votou nesta história.');
        }
      },
      error: (error) => {
        console.error('Erro ao votar:', error);
      }
    });
  }
}
