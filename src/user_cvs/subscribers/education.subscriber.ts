import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { Logger } from '@nestjs/common';
import { EducationDegree } from 'src/typeorm/entities/Education';
  
  @EventSubscriber()
  export class EducationSubscriber implements EntitySubscriberInterface<EducationDegree> {
    private readonly logger = new Logger(EducationSubscriber.name);
  
    constructor(dataSource: DataSource) {
      dataSource.subscribers.push(this);
    }
  
    listenTo() {
      return EducationDegree;
    }
  
    beforeInsert(event: InsertEvent<EducationDegree>): void | Promise<any> {
      this.logger.log(`beforeInsert`, JSON.stringify(event.entity));
    }
  
    afterInsert(event: InsertEvent<EducationDegree>): void | Promise<any> {
      this.logger.log(`afterInsert`, JSON.stringify(event.entity));
    }
  }