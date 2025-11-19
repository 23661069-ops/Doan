import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jfxemmwakudwgkfdbufb.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeGVtbXdha3Vkd2drZmRidWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDMyODIsImV4cCI6MjA3OTExOTI4Mn0.ZiCfpBSMSrsnSMbuI5ouOJw3Qx1cCcRVZbFFGGKlUfA";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;
