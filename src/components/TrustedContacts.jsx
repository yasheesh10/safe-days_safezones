import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const TrustedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchContacts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("trusted_contacts")
      .select("*")
      .eq("user_id", user.id);

    setContacts(data || []);
  };

const addContact = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER ID:", user?.id);

  if (!name || !email) return;

  const payload = {
    user_id: user?.id,
    name,
    email,
  };

  console.log("INSERT PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("trusted_contacts")
    .insert(payload);

  console.log("INSERT ERROR:", error);
  console.log("INSERT DATA:", data);

  if (error) {
    alert("Insert failed: " + error.message);
    return;
  }

  setName("");
  setEmail("");

  fetchContacts();
};

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-bold text-white">Trusted Contacts</h2>

      <div className="flex gap-2">
        <input
          className="w-full rounded-xl border border-cyan-500/20 bg-slate-950/60 p-3 text-white placeholder:text-slate-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded-xl border border-cyan-500/20 bg-slate-950/60 p-3 text-white placeholder:text-slate-400"
          placeholder="Email"
          value={email}
onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white" onClick={addContact}>
          Add
        </Button>
      </div>

      {contacts.map((c) => (
        <div key={c.id} className="border border-cyan-500/20 bg-slate-950/60 text-white p-2 rounded-xl">
          <div>
  <p className="font-semibold text-white">
    {c.name}
  </p>

  <p className="text-sm text-slate-400">
    {c.email}
  </p>
</div>
        </div>
      ))}
    </div>
  );
};

export default TrustedContacts;
