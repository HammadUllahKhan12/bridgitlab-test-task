import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BrokerStatus } from 'src/enums/broker-status.enum';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IsDate, IsDecimal, IsEmail, IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { State } from 'src/enums/state.enum';

/**
 * Data model for the brokers table which holds
 * their account and licensing information
 */
@Table({
  tableName: 'brokers',
  timestamps: true,
})
export class Broker extends Model<Broker> {
  /**
   * The primary key for the row
   */
  @ApiProperty({
    description: 'The primary key for the row',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  /**
   * A branded version of the id to distinguish between data types
   */
  @Column({
    type: DataType.VIRTUAL,
    get() {
      const id = this.getDataValue('id');
      return `A${id.toString().padStart(5, '0')}`;
    },
  })
  brokerId: string;
  /**
   * The first line of the broker's business address
   */
  @ApiProperty({
    description: "The first line of the broker's business address",
  })
  @Column({ type: DataType.STRING(50), field: 'address_line_1' })
  @IsString()
  addressLine1: string;
  /**
   * The second line of the broker's business address
   */
  @ApiPropertyOptional({
    description: "The second line of the broker's business address",
  })
  @Column({ type: DataType.STRING(50), field: 'address_line_2' })
  @IsString()
  @IsOptional()
  addressLine2?: string;
  /**
   * The city the broker's business is in
   */
  @ApiProperty({ description: "The city the broker's business is in" })
  @Column({ type: DataType.STRING(50), field: 'address_city' })
  @IsString()
  addressCity: string;
  /**
   * The postal code of the broker's business
   */
  @ApiProperty({ description: "The postal code of the broker's business" })
  @Column({
    type: DataType.STRING(10),
    field: 'address_post_code',
  })
  @IsString()
  addressPostCode: string;
  /**
   * The state or territory the broker's business is in
   */
  @ApiProperty({
    description: "The state or territory the broker's business is in",
    enum: State,
  })
  @Column({
    field: 'address_state',
    type: 'enum_state',
  })
  @IsEnum(State)
  addressState: State;
  /**
   * The broker's Australian Credit License number
   */
  @ApiProperty({ description: "The broker's Australian Credit License number" })
  @Column({ type: DataType.STRING(50), field: 'australian_credit_license' })
  @IsString()
  australianCreditLicense: string;
  /**
   * The broker's fee
   */
  @ApiProperty({ description: "The broker's fee" })
  @Column({
    type: DataType.DECIMAL(5),
    field: 'broker_fee',
    get(...args: Array<unknown>) {
      const value = this.getDataValue(args[0] as string);
      return value === null ? null : parseFloat(value);
    },
  })
  @IsDecimal()
  brokerFee: number;
  /**
   * The broker's firm
   */
  @ApiProperty({ description: "The broker's firm" })
  @Column({ type: DataType.STRING(50), field: 'broker_firm' })
  @IsString()
  brokerFirm: string;
  /**
   * The broker's status active/inactive/etc
   */
  @ApiProperty({ description: "The broker's status active/inactive/etc", enum: BrokerStatus })
  @Column({
    field: 'broker_status',
    type: 'enum_broker_status',
    defaultValue: BrokerStatus.Inactive,
  })
  @IsEnum(BrokerStatus)
  brokerStatus: BrokerStatus;
  /**
   * The broker's Credit Representative number
   */
  @ApiProperty({ description: "The broker's Credit Representative number" })
  @Column({ type: DataType.STRING(50), field: 'credit_representative_number' })
  @IsString()
  creditationNumber: string;
  /**
   * The broker's date-of-birth
   */
  @ApiProperty({ description: "The broker's date-of-birth" })
  @Column({ type: DataType.DATE, field: 'date_of_birth' })
  @IsDate()
  dateOfBirth: Date;
  /**
   * The broker's email address
   */
  @ApiProperty({ description: "The broker's email address" })
  @Column({
    type: DataType.STRING(50),
    validate: { isEmail: true },
    unique: true,
  })
  @IsEmail()
  email: string;
  /**
   * The broker's first name
   */
  @ApiProperty({ description: "The broker's first name" })
  @Column({ type: DataType.STRING(50), field: 'first_name' })
  @IsString()
  firstName: string;
  /**
   * The broker's last name
   */
  @ApiProperty({ description: "The broker's last name" })
  @Column({ type: DataType.STRING(50), field: 'last_name' })
  @IsString()
  lastName: string;
  /**
   * The broker's mobile phone number
   */
  @ApiProperty({ description: "The broker's mobile phone number" })
  @Column({
    type: DataType.STRING(20),
    field: 'mobile_phone_number',
    unique: true,
  })
  @IsMobilePhone('en-AU')
  mobilePhoneNumber: string;
  /**
   * The broker's sign-in password
   */
  @ApiProperty({ description: "The broker's sign-in password" })
  @Column({
    type: DataType.STRING(70),
    field: 'password_hash',
  })
  @IsString()
  passwordHash: string;
  /**
   * The date the row was created
   */
  @ApiProperty({ description: 'The date the row was created', type: Date, format: 'date-time' })
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  @IsDate()
  createdAt: Date;
  /**
   * The date the row last modified
   */
  @ApiPropertyOptional({ description: 'The date the row was last modified', type: Date, format: 'date-time' })
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
