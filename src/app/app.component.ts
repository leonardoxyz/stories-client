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
import { MessageService } from 'primeng/api';

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
  visible: boolean = false;
  votes: Vote[] | undefined;
  selectedStory: Story | null = null;

  public stories: Story[] = [];
  public error: string | null = null;

  newStory: Story = new Story();
  addStoryVisible: boolean = false;

  constructor(private messageService: MessageService, private voteService: VoteService, private formBuilder: FormBuilder, private httpClient: HttpClient, private userService: UserService, private storyService: StoryService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
    this.storyService.stories$.subscribe(stories => this.stories = stories);
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

    this.storyService.get()
  }

  openAddStoryDialog() {
    this.newStory = new Story();
    this.addStoryVisible = true;
  }

  closeAddStoryDialog() {
    this.addStoryVisible = false;
  }

  submitNewStory(story: Story) {
    this.storyService.add(story).subscribe(
      (newStory: Story) => {
        this.stories.push(newStory);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'História adicionada com sucesso!' });
        this.addStoryVisible = false;
        this.storyService.get()
      },
      (error) => {
        console.error('Erro ao adicionar a história:', error);
      }
    );
  }

  putStory() {
    if (this.selectedStory) {
      this.selectedStory.departmentId = this.selectedDepartment?.id || '';
      this.storyService.put(this.selectedStory).subscribe(
        (updatedStory: Story) => {
          const index = this.stories.findIndex(s => s.id === updatedStory.id);
          if (index !== -1) {
            this.stories[index] = updatedStory;
          }
          this.visible = false;
          this.getStories();
        },
        (error) => {
          console.error('Erro ao editar a história:', error);
        }
      );
    }
  }

  private getStories() {
    this.storyService.get()
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'História deletada com sucesso!' });
          this.storyService.get()
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
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Nenhum usuário selecionado.' });
      return;
    }

    const userId = this.selectedUser?.id;
    const story = this.stories.find(s => s.id === storyId);

    if (!story) {
      console.error('História não encontrada.');
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'História não encontrada.' });
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Voto registrado com sucesso!' })
          console.log('Voto registrado com sucesso.');
          console.log('ID do Usuário: ', userId);

          this.storyService.get()
        } else {
          console.error('Este usuário já votou nesta história.');
        }
      },
      error: (error) => {
        console.error('Erro ao votar:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao votar.' });
      }
    });
  }

  openEditDialog(story: Story) {
    this.selectedStory = { ...story };

    if (this.selectedStory && this.departments) {
      this.selectedDepartment = this.departments.find(d => d.id === this.selectedStory?.departmentId);
    }

    this.visible = true;
  }

  closeEditDialog() {
    this.selectedStory = null;
    this.visible = false;
  }
}
