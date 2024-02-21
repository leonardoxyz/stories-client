import { Vote } from "./Vote"

export class Story {
    id!: string
    title!: string
    description!: string
    likes!: number
    dislikes!: number
    departmentId!: string
    Votes!: Vote[];
}

