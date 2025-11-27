"use client";

import RolloffTownPage from "@/components/rolloff/RolloffTownPage";

interface Props {
  params: { slug: string };
}

export default function RollOffTownPage({ params }: Props) {
  return <RolloffTownPage slug={params.slug} />;
}
