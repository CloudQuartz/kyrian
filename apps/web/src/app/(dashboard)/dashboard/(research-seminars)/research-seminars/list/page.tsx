import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { getServerSession } from 'next-auth/next'

import { appRouter } from '@kyrian/api'
import { authOptions } from '@kyrian/auth'
import { prisma } from '@kyrian/db'
import { Button } from '@kyrian/ui'

import GenericDataTable from '~/components/table/generic-data-table'
import { columns } from '~/app/(dashboard)/dashboard/(research-seminars)/research-seminars/list/columns'

const ResearchSeminarsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/api/auth/signin')
  }

  if (session.user.role !== 'admin') {
    return redirect('/')
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma: prisma,
    },
  })

  const researchSeminars = await ssg.researchSeminar.list.fetch()

  return (
    <div className='app-space-y-8 container mx-auto py-10'>
      <div className='md:app-flex app-justify-between app-items-center'>
        <div className='app-grid app-gap-1'>
          <h1 className='app-font-heading app-text-3xl md:app-text-4xl'>
            Semilleros de investigación
          </h1>
        </div>

        <NextLink href={'/dashboard/research-seminars/new'} passHref>
          <Button className='app-mt-4 md:app-mt-0'>
            Crear seminario de investigación
          </Button>
        </NextLink>
      </div>

      <GenericDataTable columns={columns} data={researchSeminars} />
    </div>
  )
}

export default ResearchSeminarsPage
