import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from './Service/user.service';
import { StoryService } from './Service/story.service';
import { DepartmentService } from './Service/department.service';
import { VoteService } from './Service/vote.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        DropdownModule,
        DropdownModule,
        FormsModule
      ],
      providers: [
        UserService,
        StoryService,
        DepartmentService,
        VoteService,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDepartments and getStories on ngOnInit', () => {
    const userService = TestBed.inject(UserService);
    const storyService = TestBed.inject(StoryService);
    const departmentService = TestBed.inject(DepartmentService);

    spyOn(userService, 'get').and.callThrough();
    spyOn(storyService, 'get').and.callThrough();
    spyOn(departmentService, 'get').and.callThrough();

    component.ngOnInit();

    expect(userService.get).toHaveBeenCalled();
    expect(storyService.get).toHaveBeenCalled();
    expect(departmentService.get).toHaveBeenCalled();
  });

  it('should sort stories', () => {
    component.selectedOption = { name: 'Likes', sortBy: 'likes' };
    component.sortStories();
    expect(component.stories).toBeTruthy();
  });

  it('should not sort stories if no option is selected', () => {
    component.selectedOption = undefined;
    spyOn(console, 'error');
    component.sortStories();
    expect(console.error).toHaveBeenCalledWith('Nenhuma opção selecionada.');
  });

  it('should sort stories by likes', () => {
    component.selectedOption = { name: 'Likes', sortBy: 'likes' };
    component.stories = [
      { id: uuidv4(), title: 'story test', description: 'description story test', likes: 1, dislikes: 0, departmentId: uuidv4() },
      { id: uuidv4(), title: 'story test', description: 'description story test', likes: 2, dislikes: 0, departmentId: uuidv4() },
      { id: uuidv4(), title: 'story test', description: 'description story test', likes: 3, dislikes: 0, departmentId: uuidv4() },
    ];
    component.sortStories();
    expect(component.stories[0].likes).toBe(3);
  })

  it('should sort stories by dislikes', () => {
    component.selectedOption = { name: 'Dislikes', sortBy: 'dislikes' };
    component.stories = [
      { id: uuidv4(), title: 'story test', description: 'description story test', likes: 0, dislikes: 1, departmentId: uuidv4() },
      { id: uuidv4(), title: 'story test', description: 'description story test', likes: 0, dislikes: 2, departmentId: uuidv4() },
      { id: uuidv4(), title: 'story test', description: 'description story test', likes: 0, dislikes: 3, departmentId: uuidv4() },
    ];
    component.sortStories();
    expect(component.stories[0].dislikes).toBe(3);
  });

  it('should get department name', () => {
    component.departments = [
      { id: uuidv4(), name: 'department test' }
    ];
    expect(component.getDepartmentName(component.departments[0].id)).toBe('department test');
  });

  it('should return "Departamento não encontrado" if department is not found', () => {
    expect(component.getDepartmentName(uuidv4())).toBe('Departamento não encontrado');
  });

  it('should call getDepartments on getDepartments', () => {
    const departmentService = TestBed.inject(DepartmentService);
    spyOn(departmentService, 'get').and.callThrough();
    component.getDepartments();
    expect(departmentService.get).toHaveBeenCalled();
  });

  it('should call deleteStory on deleteStory', () => {
    const storyService = TestBed.inject(StoryService);
    spyOn(storyService, 'delete').and.callThrough();
    component.deleteStory(uuidv4());
    expect(storyService.delete).toHaveBeenCalled();
  });

  it('should call userService.get on ngOnInit', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'get').and.callThrough();
    component.ngOnInit();
    expect(userService.get).toHaveBeenCalled();
  });

  it('should call storyService.get on ngOnInit', () => {
    const storyService = TestBed.inject(StoryService);
    spyOn(storyService, 'get').and.callThrough();
    component.ngOnInit();
    expect(storyService.get).toHaveBeenCalled();
  });

  it('should call departmentService.get on ngOnInit', () => {
    const departmentService = TestBed.inject(DepartmentService);
    spyOn(departmentService, 'get').and.callThrough();
    component.ngOnInit();
    expect(departmentService.get).toHaveBeenCalled();
  });

  it('should call storyService.delete on deleteStory', () => {
    const storyService = TestBed.inject(StoryService);
    spyOn(storyService, 'delete').and.callThrough();
    component.deleteStory(uuidv4());
    expect(storyService.delete).toHaveBeenCalled();
  });

  it('should call console.error if no option is selected on sortStories', () => {
    component.selectedOption = undefined;
    spyOn(console, 'error');
    component.sortStories();
    expect(console.error).toHaveBeenCalledWith('Nenhuma opção selecionada.');
  });

  it('should call userService.get on ngOnInit', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'get').and.callThrough();
    component.ngOnInit();
    expect(userService.get).toHaveBeenCalled();
  });
});