require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'ghiles@test.com',
    password: 'password'
  });
  console.log("SignIn:", signInError ? signInError.message : "Success");
  
  if (signInData.session) {
    const file = new Blob(['hello world'], { type: 'text/plain' });
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload('licenses/test2.txt', file);
    
    console.log("Upload:", uploadError ? uploadError.message : "Success");
  }
}
test();
