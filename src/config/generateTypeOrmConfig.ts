import { ConfigService } from '@nestjs/config';
import fs from 'fs';

const generateTypeormConfigFile = (config: ConfigService) => {
  const typeormConfig = config.get('database');
  console.log(typeormConfig);
  fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
};

export default generateTypeormConfigFile;
