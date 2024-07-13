import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;