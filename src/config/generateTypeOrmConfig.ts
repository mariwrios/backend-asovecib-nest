import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

const generateTypeormConfigFile = (config: ConfigService) => {
  const typeormConfig = config.get('database');
  fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
};

export default generateTypeormConfigFile;
