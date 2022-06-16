import React, { useState, useEffect, useRef } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Toast from '@/components/Toast';
import MyDialog from '@/components/MyDialog';

const Order = props => {
    // 获取订单列表
    const [tabData, setTabData] = useState({
        list: [],
        total: 0,
        page: 0,
    });
    const [page, setPage] = useState(0);
    const [email, setEmail] = useState('');

    const getUserlist = async () => {
        let params = {
            page,
            email: email.trim(),
        };
        const { data: res } = await apiUserlist(params);
        if (res.status === 200) {
            setTabData(res.data);

            console.log('列表', res.data);
        }
    };

    useEffect(() => {
        // getUserlist();
    }, []);

    const pageChange = (event, newPage) => {
        setPage(newPage);
    };

    // 编辑用户
    const [userEmaile, seUserEmaile] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [byWhom, setByWhom] = useState('');

    const [userid, setUserid] = useState('');
    const [editMydialog, setEditMydialog] = useState(false);

    const editMyDialogClose = event => {
        setEditMydialog(false);
    };
    const setEdit = (ue, up, a, b, id) => {
        seUserEmaile(ue);
        setUserPassword(up);
        setAvatar(a);
        setByWhom(b);

        setUserid(id);
        setEditMydialog(true);
    };

    const editUser = async () => {
        if (userEmaile.trim().length <= 0 || userPassword.trim().length <= 0) {
            Toast.error('请先输入内容');
            return;
        }

        let params = {
            _id: userid,
            userEmail: userEmaile.trim(),
            userPassword: userPassword.trim(),
            avatar: avatar.trim(),
            byWhom: byWhom.trim(),
        };

        // const { data: res } = await apiEditUser(params);
        // if (res.status === 200) {
        //     getUserlist();
        //     editMyDialogClose();

        //     seUserEmaile('');
        //     setUserPassword('');
        //     setAvatar('');
        //     setByWhom('');
        //     setUserid('');

        //     Toast.success('编辑是用户成功');
        //     return;
        // }

        Toast.error(res.msg);
    };

    // 删除用户
    const [openMydialog, setOpenMydialog] = useState(false);

    const MyDialogClose = event => {
        setOpenMydialog(false);
    };

    const [userId, setUserId] = useState('');

    const removeUser = async () => {
        let params = {
            userId,
        };

        const { data: res } = await apiRemoveUser(params);
        if (res.status === 200) {
            getUserlist();
            MyDialogClose();
            setUserId('');
            Toast.success('删除用户成功');
            return;
        }

        Toast.error(res.msg);
    };

    // 判断是否为 ios 移动端
    const isIosMobile = () => {
        //或者直接用正则，i是忽略大小写
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return true;
        }

        return false;
    };

    return (
        <Container
            disableGutters
            sx={{ maxWidth: '100% !important', m: 0, p: { xs: 0, md: 3, lg: 3 } }}
        >
            <Box>
                <Card
                    className="buycard"
                    sx={{
                        padding: { xs: '35px 24px 0', md: '20px 24px 40px', lg: '20px 24px 40px' },
                        background: React.$theme.background[50],
                    }}
                    elevation={0}
                >
                    <Typography variant="h6" sx={{ mb: 2 }} color="text.900">
                        订单列表
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <OutlinedInput
                            sx={{
                                width: '260px',
                                fontSize: '15px ',
                                height: 42,
                                verticalAlign: 'middle',
                            }}
                            placeholder="根据邮箱查找"
                            id="login_email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyUp={e => {
                                if (e.key === 'Enter') {
                                    getUserlist();
                                }
                            }}
                        />
                        <Box
                            sx={{
                                ml: { xs: 0, md: 2, lg: 2 },
                                mt: { xs: 2, md: 0, lg: 0 },
                            }}
                        >
                            <Button
                                variant="contained"
                                disableElevation
                                onClick={() => getUserlist()}
                            >
                                查找
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            overflowX: 'auto',
                        }}
                    >
                        {tabData.list <= 0 ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <Divider
                                    sx={{ borderColor: React.$theme.background[200], mb: 0.5 }}
                                />
                                <Box sx={{ mt: 3 }}>暂无数据</Box>
                            </Box>
                        ) : (
                            <Table
                                sx={{
                                    '.MuiTableCell-root': {
                                        borderColor: React.$theme.background[200],
                                    },
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>邮箱</TableCell>
                                        <TableCell>密码</TableCell>
                                        <TableCell>上行流量</TableCell>
                                        <TableCell>下载流量</TableCell>
                                        <TableCell>创建时间</TableCell>
                                        <TableCell align="right">操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tabData.list.map((m, i) => {
                                        return (
                                            <TableRow hover key={m._id}>
                                                <TableCell>{m._id}</TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>
                                                    {m.userEmail}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>
                                                    {m.userPassword}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>
                                                    {/* {countTraffic(m.totalUplink)} */}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>
                                                    {/* {countTraffic(m.totalDownlink)} */}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 160 }}>
                                                    {m.createTime}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 200 }} align="right">
                                                    <Button
                                                        sx={{}}
                                                        size="small"
                                                        disableElevation
                                                        onClick={() => {}}
                                                    >
                                                        导入
                                                    </Button>

                                                    <Button
                                                        sx={{}}
                                                        size="small"
                                                        color="success"
                                                        disableElevation
                                                        onClick={() => {}}
                                                    >
                                                        重置
                                                    </Button>
                                                    <Button
                                                        sx={{}}
                                                        size="small"
                                                        color="error"
                                                        disableElevation
                                                        onClick={() => {}}
                                                    >
                                                        删除
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            page={page}
                                            count={tabData.total}
                                            rowsPerPageOptions={[10]}
                                            rowsPerPage={-1}
                                            onPageChange={pageChange}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        )}
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default Order;
