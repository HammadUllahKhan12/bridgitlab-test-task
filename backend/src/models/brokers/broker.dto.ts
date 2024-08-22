import { ApiPropertyOptional } from '@nestjs/swagger';
import { BrokerStatus } from 'src/enums/broker-status.enum';
import { IsDate, IsDecimal, IsEmail, IsEnum, IsInt, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { State } from 'src/enums/state.enum';

/**
 * Data model for the brokers table which holds
 * their account and licensing information
 */
export class BrokerDto {
  /**
   * The primary key for the row
   */
  @ApiPropertyOptional({
    description: 'The primary key for the row',
  })
  @IsInt()
  @IsOptional()
  id?: number;
  /**
   * The first line of the broker's business address
   */
  @ApiPropertyOptional({
    description: "The first line of the broker's business address",
  })
  @IsString()
  @IsOptional()
  addressLine1?: string;
  /**
   * The second line of the broker's business address
   */
  @ApiPropertyOptional({
    description: "The second line of the broker's business address",
  })
  @IsString()
  @IsOptional()
  addressLine2?: string;
  /**
   * The city the broker's business is in
   */
  @ApiPropertyOptional({ description: "The city the broker's business is in" })
  @IsString()
  @IsOptional()
  addressCity?: string;
  /**
   * The postal code of the broker's business
   */
  @ApiPropertyOptional({ description: "The postal code of the broker's business" })
  @IsString()
  @IsOptional()
  addressPostCode?: string;
  /**
   * The state or territory the broker's business is in
   */
  @ApiPropertyOptional({
    description: "The state or territory the broker's business is in",
    enum: State,
  })
  @IsEnum(State)
  @IsOptional()
  addressState?: State;
  /**
   * The broker's Australian Credit License number
   */
  @ApiPropertyOptional({ description: "The broker's Australian Credit License number" })
  @IsString()
  @IsOptional()
  australianCreditLicense?: string;
  /**
   * The broker's fee
   */
  @ApiPropertyOptional({ description: "The broker's fee" })
  @IsDecimal()
  @IsOptional()
  brokerFee?: number;
  /**
   * The broker's firm
   */
  @ApiPropertyOptional({ description: "The broker's firm" })
  @IsString()
  @IsOptional()
  brokerFirm?: string;
  /**
   * The broker's status active/inactive/etc
   */
  @ApiPropertyOptional({ description: "The broker's status active/inactive/etc", enum: BrokerStatus })
  @IsEnum(BrokerStatus)
  @IsOptional()
  brokerStatus?: BrokerStatus;
  /**
   * The broker's Credit Representative number
   */
  @ApiPropertyOptional({ description: "The broker's Credit Representative number" })
  @IsString()
  @IsOptional()
  creditationNumber?: string;
  /**
   * The broker's date-of-birth
   */
  @ApiPropertyOptional({ description: "The broker's date-of-birth" })
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;
  /**
   * The broker's email address
   */
  @ApiPropertyOptional({ description: "The broker's email address" })
  @IsEmail()
  @IsOptional()
  email?: string;
  /**
   * The broker's first name
   */
  @ApiPropertyOptional({ description: "The broker's first name" })
  @IsString()
  @IsOptional()
  firstName?: string;
  /**
   * The broker's last name
   */
  @ApiPropertyOptional({ description: "The broker's last name" })
  @IsString()
  @IsOptional()
  lastName?: string;
  /**
   * The broker's mobile phone number
   */
  @ApiPropertyOptional({ description: "The broker's mobile phone number" })
  @IsMobilePhone('en-AU')
  @IsOptional()
  mobilePhoneNumber?: string;
  /**
   * The broker's sign-in password
   */
  @ApiPropertyOptional({ description: "The broker's sign-in password" })
  @IsString()
  @IsOptional()
  passwordHash?: string;
  /**
   * The date the row was created
   */
  @ApiPropertyOptional({ description: 'The date the row was created', type: Date, format: 'date-time' })
  @IsDate()
  @IsOptional()
  createdAt?: Date;
  /**
   * The date the row last modified
   */
  @ApiPropertyOptional({ description: 'The date the row was last modified', type: Date, format: 'date-time' })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
