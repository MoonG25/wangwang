import * as redisStore from 'cache-manager-redis-store';
import { CacheModule as BaseCacheModule, Module } from "@nestjs/common";
import { CacheService } from './cache.service';

// registerAsync가 필요한가?
@Module({
  imports: [
    BaseCacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 604800,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}