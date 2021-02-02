import UserService from "../services/UserService";
import { NextFunction, Request, Response }  from "express";
import UserValidation from "./validations/UserValidation";
import addPermissionValidation from "./validations/AddPermissionValidation";
import PermissionValidation from "./validations/PermissionValidation";
import AddPermissionValidation from "./validations/AddPermissionValidation";
import UpdateUserValidation from "./validations/UpdateUserValidation";

export default class UserEndpoint {

    constructor(
        private readonly userService: UserService,
    ) {
        this.create = this.create.bind(this);
        this.getPermissions = this.getPermissions.bind(this);
        this.createPermission = this.createPermission.bind(this);
        this.addPermissionsForUser = this.addPermissionsForUser.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
    }

    public async findAll(request: Request, response: Response, next: NextFunction) { 
        try {
            const users = await this.userService.findAll();
            response.json(users);
        } catch(error) {
            next(error);
        }
    }

    public async findById(request: Request, response: Response, next: NextFunction) { 
        try {
            const id = request.params.id;
            // @ts-ignore
            const users = await this.userService.findById(id);
            response.json(users);
        } catch(error) {
            next(error);
        }
    }

    public async getPermissions(request: Request, response: Response, next: NextFunction) { 
        try {
            const permissions = await this.userService.getPermissions();
            response.json(permissions);
        } catch(error) {
            next(error);
        }
    }

    public async createPermission(request: Request, response: Response, next: NextFunction) { 
        try {
            const datas = request.body;
            PermissionValidation.validate(datas);
            await this.userService.createPermission(datas.name);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    public async addPermissionsForUser(request: Request, response: Response, next: NextFunction) { 
        try {
            const id = request.params.id;
            const data = request.body;
            AddPermissionValidation.validate(data);
            // @ts-ignore
            await this.userService.addPermissions(id, data.permissions);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newUser = request.body;
            UserValidation.validate(newUser);
            const userCreated = await this.userService.create(newUser);
            delete userCreated.password;
            response.status(201).json(userCreated);
        } catch(error) {
            next(error);
        }
    }


    public async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const datasModified = request.body;
            UpdateUserValidation.validate(datasModified);
            // @ts-ignore
            await this.userService.update(id, datasModified);
            response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }
}