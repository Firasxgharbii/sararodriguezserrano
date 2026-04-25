"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type Oeuvre = {
  id: number;
  title: string;
  year: string;
  category: string;
  availability: string;
  image: string;
  created_at: string;
};

type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
};

export default function DatabaseSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [oeuvres, setOeuvres] = useState<Oeuvre[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"messages" | "oeuvres" | "users">(
    "messages"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDatabase = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/dashboard/database", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Impossible de charger la base de données.");
        return;
      }

      setMessages(data.data.messages || []);
      setOeuvres(data.data.oeuvres || []);
      setUsers(data.data.users || []);
    } catch {
      setError("Erreur lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  return (
    <section className="mt-12 rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Base de données
          </p>
          <h2 className="mt-2 text-3xl font-light text-neutral-900">
            Données enregistrées
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Consultez les messages, œuvres et utilisateurs en temps réel.
          </p>
        </div>

        <button
          onClick={loadDatabase}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white"
        >
          Actualiser
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <button
          onClick={() => setActiveTab("messages")}
          className={`rounded-2xl border p-5 text-left ${
            activeTab === "messages"
              ? "border-black bg-black text-white"
              : "border-neutral-200 bg-neutral-50 text-neutral-900"
          }`}
        >
          <p className="text-sm opacity-70">Messages</p>
          <p className="mt-2 text-3xl">{messages.length}</p>
        </button>

        <button
          onClick={() => setActiveTab("oeuvres")}
          className={`rounded-2xl border p-5 text-left ${
            activeTab === "oeuvres"
              ? "border-black bg-black text-white"
              : "border-neutral-200 bg-neutral-50 text-neutral-900"
          }`}
        >
          <p className="text-sm opacity-70">Œuvres</p>
          <p className="mt-2 text-3xl">{oeuvres.length}</p>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`rounded-2xl border p-5 text-left ${
            activeTab === "users"
              ? "border-black bg-black text-white"
              : "border-neutral-200 bg-neutral-50 text-neutral-900"
          }`}
        >
          <p className="text-sm opacity-70">Utilisateurs</p>
          <p className="mt-2 text-3xl">{users.length}</p>
        </button>
      </div>

      {loading && (
        <p className="mt-8 rounded-2xl bg-neutral-50 p-5 text-neutral-500">
          Chargement des données...
        </p>
      )}

      {error && (
        <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && activeTab === "messages" && (
        <div className="mt-8 space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">
                    {item.subject}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {item.name} — {item.email}
                  </p>
                </div>
                <p className="text-xs text-neutral-400">
                  {new Date(item.created_at).toLocaleString("fr-CA")}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && activeTab === "oeuvres" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {oeuvres.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-4 h-48 w-full rounded-xl object-cover"
                />
              )}

              <h3 className="text-lg font-medium text-neutral-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                {item.category} • {item.year}
              </p>

              <p className="mt-2 text-sm text-neutral-600">
                Disponibilité : {item.availability}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && activeTab === "users" && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100 text-neutral-500">
              <tr>
                <th className="p-4">Nom</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rôle</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-neutral-200">
                  <td className="p-4">{user.full_name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">
                    {Number(user.is_active) === 1 ? "Actif" : "Désactivé"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}