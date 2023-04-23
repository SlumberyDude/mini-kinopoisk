import { Controller, UseFilters } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { CreateRoleDto } from "./dto/create-role.dto";
// import { HttpExceptionFilter, SharedService } from "y/shared";
// import { CreateRoleDto } from "y/shared/dto";
// import { DtoValidationPipe } from "y/shared/pipes/dto-validation.pipe";
import { RolesService } from "./roles.service";

@Controller('roles')
export class RolesController {

    constructor(
        private readonly rolesService: RolesService,
        // private readonly sharedService: SharedService,
    ) {}

    
    // @UseFilters(new HttpExceptionFilter())
    @MessagePattern({ cmd: 'create-role' })
    async getUser(
        // @Ctx() context: RmqContext,
        @Payload() dto: CreateRoleDto
    ) {
        // this.sharedService.acknowledgeMessage(context);
        console.log(`[roles.controller][create-dto] dto: ${JSON.stringify(dto)}`);

        return await this.rolesService.createRole(dto);
    }

    // @UseFilters(new HttpExceptionFilter())
    @MessagePattern({ cmd: 'get-role-by-name' })
    getByName(
        // @Ctx() context: RmqContext,
        @Payload() roleName: string
    ) {
        return this.rolesService.getRoleByName(roleName);
    }

    // @UseFilters(new HttpExceptionFilter())
    @MessagePattern({ cmd: 'get-all-roles' })
    getAllRoles() {
        return this.rolesService.getAllRoles();
    }

    @MessagePattern({ cmd: 'delete-role-by-name' })
    deleteRoleByName(
        @Payload('name') roleName: string,
        @Payload('permission') perm: number
    ) {
        return this.rolesService.deleteByName(roleName, perm);
    }
}