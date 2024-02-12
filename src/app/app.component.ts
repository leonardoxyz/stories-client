import { Component, OnInit } from '@angular/core';
import { User } from './Model/User';
import { UserService } from './Service/user.service';
import { Story } from './Model/Story';
import { StoryService } from './Service/story.service';
import { Department } from './Model/Department';
import { DepartmentService } from './Service/department.service';
import { Option } from './Model/Option';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] | undefined;
  options: Option[] | undefined;
  selectedUser: User | undefined;
  selectedOption: Option | undefined;
  departments: Department[] | undefined;
  selectedStory: Story | undefined;
  newStory: Story = new Story();

  public title: string = '';
  public description: string = '';
  public departmentId: string = '';

  public stories: Story[] = [];
  public error: string | null = null;

  constructor(private userService: UserService, private storyService: StoryService, private departmentService: DepartmentService) { } // Adicionar DepartmentService ao construtor

  ngOnInit() {
    this.getDepartments();
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );

    this.options = [
      { name: 'Mais votado', sortBy: 'likes' },
      { name: 'Menos votado', sortBy: 'dislikes' }
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

  onChangeOption() {
    this.sortStories();
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
  
  postStory() {
    if (!this.title || !this.description || !this.departmentId) {
      console.error('Preencha todos os campos.');
      return;
    }
  
    const newStory: Story = {
      title: this.title,
      description: this.description,
      likes: 0,
      dislikes: 0,
      departmentId: this.departmentId
    };
  
    this.storyService.post(newStory).subscribe({
      next: (story: Story) => {
        console.log('História registrada com sucesso:', story);
        this.stories.push(story); // Adiciona a nova história à lista existente sem recarregar todas as histórias novamente
        this.resetForm(); // Limpa os campos do formulário após a postagem bem-sucedida
      },
      error: (error) => {
        console.error('Erro ao registrar história:', error);
        this.error = 'Erro ao registrar história. Por favor, tente novamente.';
      }
    });
  }
  
  resetForm() {
    this.title = '';
    this.description = '';
    this.departmentId = ''; // Limpa apenas o ID do departamento
  }
  

  // deleteStory(storyId: string) {
  //   this.storyService.delete(storyId).subscribe({
  //     next: (success) => {
  //       if (success) {
  //         console.log('História deletada com sucesso.');
  //         this.storyService.get().subscribe(
  //           (stories: Story[]) => {
  //             this.stories = stories;
  //           },
  //           (error) => {
  //             console.error('Erro ao buscar histórias:', error);
  //           }
  //         );
  //       } else {
  //         console.error('Erro ao deletar história.');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Erro ao deletar história:', error);
  //     }
  //   });
  // }

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
      isLiked: isLiked,
      StoryId: storyId,
      story: story
    };

    this.storyService.addVote(vote).subscribe({
      next: (success) => {
        if (success) {
          console.log('Voto registrado com sucesso.');
          this.storyService.get().subscribe(
            (stories: Story[]) => {
              this.stories = stories;
            },
            (error) => {
              console.error('Erro ao buscar estórias', error);
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
