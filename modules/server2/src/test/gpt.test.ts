import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { App } from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthRoute } from '@routes/auth.route';
import axios from 'axios';

interface GPTResponse {
  output: {
    finish_reason: string;
    text: string;
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
}

// describe('Testing Tongyi', () => {
//   console.log('this is test');
//   it('can retrieve response from tongyi API', async () => {
//     let token = process.env.TYKEY;
//     let option = 'qwen-turbo';
//     let res = await axios({
//       method: 'POST',
//       url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//       data: {
//         model: option,
//         input: {
//           messages: [
//             // { role: 'system', content: chatMgs.getSystemMsg() },
//             // { role: 'user', content: chatMgs.getUserMsg('hello') },
//             // { role: 'assistant', content: '你好' },
//             // { role: 'user', content: origin },
//             { role: 'user', content: 'can you help me to convert code?' },
//           ],
//         },
//         parameters: {},
//       },
//     });
//     let resData: GPTResponse = res.data;

//     console.log('res' + resData.output.text);
//     console.log('res' + JSON.stringify(resData, null, 2));
//   });
// });
