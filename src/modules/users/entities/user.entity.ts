import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { Index, Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { IsString, IsEmail, MaxLength } from 'class-validator';
import { CustomBaseEntity } from '@modules/common/entities/base.entity';
import { Role } from '@modules/roles/entities/role.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  static entityName: string = 'User';

  @Exclude()
  @ApiProperty()
  @Column({ length: 100 })
  @Index('UIDX_User_Username', { unique: true })
  @MaxLength(100)
  @IsString()
  username: string;

  @Expose()
  @ApiProperty()
  @Column({ length: 100, nullable: true })
  @Index('UIDX_User_Email', { unique: true, where: 'email IS NOT NULL' })
  @MaxLength(100)
  @IsEmail()
  email?: string;

  @Expose()
  @ApiProperty()
  @MaxLength(100)
  @Optional()
  @Column({ length: 100, nullable: true })
  @Index('IDX_User_Mobile')
  mobile?: string;

  @Expose()
  @ApiProperty()
  @MaxLength(100)
  @Index('IDX_User_Display_Name')
  @Column({ length: 512, name: 'display_name', nullable: true })
  displayName?: string;

  @Exclude()
  @Column({ length: 100, nullable: true })
  password?: string;

  @Expose()
  @ApiProperty()
  get roleName(): string {
    return this.role?.name || '';
  }

  @Exclude()
  @Index('IDX_User_Role_Id')
  @Column({ name: 'role_id', nullable: true })
  roleId?: string;

  @Expose()
  @ApiProperty()
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
